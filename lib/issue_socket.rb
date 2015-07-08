require 'json'
class IssueSocket
  attr_reader :env

  def initialize app
    @app = app
    @clients = []
  end

  def call env
    @env = env
    if socket_request?
      socket = spawn_socket
      @clients << socket
      socket.rack_response
    else
      @app.call env
    end
  end

  private
  def socket_request?
    Faye::WebSocket.websocket? env
  end
end

def spawn_socket
  socket = Faye::WebSocket.new env
  resp = {
    type: 'open',
    status: 'success'
  }
  socket.on :open do
    socket.send resp.to_json
  end
  socket.on :close do
    @clients.delete(socket)
    socket = nil
  end
  socket.on :message do |event|
    req = JSON.parse(event.data)
    resp = {}
    case req['type']
    when 'new_issue'
      resp = Handler.create_new_issue req
    when 'new_note'
      resp = Handler.create_new_note req
    when 'thumb_vote'
      resp = Handler.handle_thumb_vote req
    when 'prev_issue'
      resp = Handler.show_prev_issue req
    when 'next_issue'
      resp = Handler.show_next_issue req
    end
    @clients.reject{ |client| !same_session?(client, socket) }.each do |client|
      client.send resp.to_json
    end
  end
  socket
end

def same_session? client, socket
  client.env["REQUEST_PATH"] == socket.env["REQUEST_PATH"]
end

