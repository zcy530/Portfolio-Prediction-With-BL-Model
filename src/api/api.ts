import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',  // 此处为测试代理地址，端口为8000，生产环境请修改为对应的`http://ip:port`,并删除或重命名src/setupProxy.js
    }),
    endpoints: builder => ({
        submit: builder.mutation({
            query: ({
                        max_lookback_years,
                        max_position_size,
                        min_position_size,
                        tolerance_factor,
                        data_source,
                        CodeList
                    }) => ({
                url: "/main",
                method: "POST",
                body: {
                    max_lookback_years, max_position_size, min_position_size, tolerance_factor, data_source, CodeList
                }
            }),
        })
    })

})
export const {
    useSubmitMutation
} = api