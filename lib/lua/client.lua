
host = "localhost:8000"

id = os.getComputerLabel()

if id == "" then
    local chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    for i = 1, tonumber(4) do
        local r = math.random(#chars)
        id = id .. chars:sub(r, r)
    end

    os.setComputerLabel(id)
end

function tojson(obj)
    local t = type(obj)
    if t == "number" or t == "boolean" then
        return tostring(obj)
    elseif t == "string" then
        return "\"" .. tostring(obj) .. "\""
    elseif t == "function" or t == "nil" then
        return "null"
    elseif t == "table" then
        if obj[1] == nil then
            local s = "{"
            for k, v in pairs(obj) do
                s = s .. tojson(k) ..":" .. tojson(v) .. ","
            end
            s = s:sub(0, #s-1)
            return s .. "}"
        else
            local s = "["
            for _, v in pairs(obj) do
                s = s .. tojson(v) .. ","
            end
            s = s:sub(0, #s-1)
            return s .. "]"
        end
    end
end

evalstr = "null"
retries = 0

while true do
    local res = http.post("http://" .. host .. "/carry?id=" .. id, evalstr)
    
    local body = ""

    if res ~= nil then
        body = res.readAll()
        res.close()
    end

    if body == "" then
        print("Failed to connect")
        retries = retries + 1
        os.sleep((retries < 150) and 2 or 30)
        evalstr = "null"
    else
        retries = 0
        
        evalstr = tojson(loadstring("return " .. body)())
        
        print('> ' .. body)
        print(evalstr)
    end
end

