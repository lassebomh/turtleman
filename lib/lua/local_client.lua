request = require("socket.http")
ltn12 = require("ltn12")

computerLabel = ""

execute = os.execute

nos = {}

nos.getComputerLabel = function()
    return computerLabel
end

nos.setComputerLabel = function(string) 
    computerLabel = string
end

nos.sleep = function(seconds)
    execute("sleep " .. seconds)
end

os = nos

http = {}

http.post = function(url, reqbody)
    local respbody = {}
    local readres = {}

    local result, respcode, respheaders, respstatus = request.request {
        method = "POST",
        url = url,
        source = ltn12.source.string(reqbody),
        headers = {
            ["content-type"] = "application/json",
            ["content-length"] = tostring(#reqbody)
        },
        sink = ltn12.sink.table(respbody)
    }
    
    readres.readAll = function() return table.concat(respbody) end

    readres.close = function () end
    
    return readres
end

loadstring = function(string)
    return function ()
        os.sleep(1.5)
    end
end

dofile("client.lua")