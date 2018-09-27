array = @dapps.map { |k, v| { type: k, value: v } }

json.array! array, :type, :value
