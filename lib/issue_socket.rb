require 'json'
class IssueSocket
  attr_reader :env

  def initialize app
    @app = app
  end

  def call env
    @env = env
    if socket_request?
      socket = spawn_socket
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

  socket.on :message do |event|
    # socket.send event.data
    req = JSON.parse(event.data)
    resp = {}
    case req['type']
    # when 'count_down'
    #   resp = Handler.handle_count_down req
    when 'new_issue'
      resp = Handler.create_new_issue req
    when 'new_note'
      resp = Handler.create_new_note req
    when 'thumb_vote'
      resp = Handler.handle_thumb_vote req
    end
    socket.send resp.to_json
  end

  socket
end

