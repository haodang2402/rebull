# ReactJS + Material UI + Redux + Vite

### Tải và cài đặt dự án ReactJS của Crodic Crystal

```
    npm install
    npm run dev
```

### Các Thư Viện Dùng Trong Dự Án

1. [Material UI](https://mui.com/material-ui/getting-started/)
2. [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/introduction/getting-started)
3. [Axios](https://axios-http.com/vi/docs/intro)
4. [Lodash](https://lodash.com/)
5. [SASS (SCSS)](https://sass-lang.com/)
6. [React-Router-Dom](https://reactrouter.com/en/main)

### Chức năng của từng Thư Viện

> 1. Về UI sẽ dùng thư viện **Material UI** cung cấp các **Components** tiện ích của Google
> 2. Về quản lý Statement Manager và Caching Data sẽ dùng **Redux Toolkit** + **RTK Query**
> 3. Về việc gọi API sẽ dùng thư viện **Axios**, thư viện này hỗ trợ rất tốt về **interceptor** trong việc xử lý Request, Response trả về từ API
> 4. Về thư viện bổ sung ta dùng **Lodash** để xử lý các dạng array object phức tạp
> 5. Về việc CSS ngoài dùng **Material UI** thì ta dùng thêm **SASS (SCSS)** để xử lý các CSS phức tạp
> 6. **Material UI** còn hổ trợ **@emotion/styled** thư viện JSS
> 7. Về việc điều hướng trang web ta sử dùng thư viện **react-router-dom**

## Chức năng của từng thư mục

1. `assets`: Chứa các tài nguyên dùng chung như `image`, `video`, `file CSS`
2. `components`: Chứa các **Components** dùng chung trong dự án
3. `hook`: Chức các Custom Hook trong dự án
4. `pages`: Chứa các trang của ứng dụng
5. `pages/folder`: Mỗi `folder` là 1 trang của ứng dụng trong folder sẽ chứa thư mục `components`, đây là các **Components** chỉ sử dụng trong một trang
6. `redux`: Đây là thư mục có các config của `Redux Toolkit` bao gồm `slice`, `rtk query`, `store`, `redux persist`
7. `routes`: Thư mục config các route bằng thư viện `react-router-dom`
8. `services`: Thư mục chứa các dịch vụ mà trang web sử dụng như các `function` gọi API, config `Axios`,...
9. `themes`: Thư mục chứa các Theme tự config được `Material UI` hổ trợ
10. `utilities`: Thư mục chứa các hàm dùng chung cho toàn bộ trang website

## Redux Toolkit (createSlice + createAsyncThunk)

### Example:

`store.js`

```
import UserSlice from "./features/userSlice";
import ProductSlice from "./features/productSlice";
import appSlice from "./features/appSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { persistConfigUser, persistConfigProduct, persistConfigApp } from "../redux/persistConfig";
import { testApi } from "./services/test.api";


// Create Root Reducer
const _rootReducer = combineReducers({
    user: persistReducer(persistConfigUser, UserSlice),
    product: persistReducer(persistConfigProduct, ProductSlice),
    app: persistReducer(persistConfigApp, appSlice),
    [testApi.reducerPath]: testApi.reducer
});

// Create Store
export const store = configureStore({
    reducer: _rootReducer, // Apply Root Reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(testApi.middleware),
});

// Apply when using refreshOnForcus and refreshOnReconnect
// setupListeners(store.dispatch)

export const persistor = persistStore(store);

export default store;
```

> Đây là đoạn config **redux store** của dự án ReactJS này ta sử dụng `createSlice` để tạo các slice cho từng chức năng. Ví dụ ta muốn lưu trữ `uid` của User ta sẽ dùng `createSlice` để tạo 1 slice `UserSlice` như sau:

```
import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: { user: null, auth: false },
    reducers: {

    },
})

export default UserSlice.reducer;

export const { } = UserSlice.actions; // action in reducers
```

Ngoài ra Redux còn hổ trợ `persist` store dưới `localStorage` và `sessionStorage` để làm được như thế ta config file `store.js` như sau:

Trong file persistConfig tạo các config muốn lưu trữ ở `localStorage` hoặc `sessionStorage`. Theo mặc định khi sử dụng thư viện `redux-persist` data sẽ được lưu trữ ở `localStorage`, ta có thể import `sessionStorage` từ thư viện `redux-persist` để lưu data ở **session**. `whiteList` là dữ liệu cần lưu trữ trong slice ở đây ta sẽ lưu trữ biến `user`

```
import sessionStorage from 'redux-persist/es/storage/session';
import storage from 'redux-persist/lib/storage';

export const persistConfigUser = {
    key: 'user',
    storage: sessionStorage,
    whitelist: ['user'],
};

```

Sau đó ta dùng hàm `combineReducers` để gộp các slice trước khi đưa vào store. Và để state được lưu trữ ta dùng `persistReducer` với tham số đầu tiên chính là persistConfig vừa tạo và tham số thứ 2 chính là slice

```
const _rootReducer = combineReducers({
    user: persistReducer(persistConfigUser, UserSlice),
    product: persistReducer(persistConfigProduct, ProductSlice),
    app: persistReducer(persistConfigApp, appSlice),
    [testApi.reducerPath]: testApi.reducer // RTK QUERY API
});
```

Cuối cùng ta sẽ tạo 1 store bằng `configureStore` với `reducer` là `_rootReducer` vừa tạo, tham số thứ 2 là các `middleware` cần thiết

```
export const store = configureStore({
    reducer: _rootReducer, // Apply Root Reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(testApi.middleware), // RTK QUERY API
});
```

Nếu muốn dùng các chức năng tự fetch data khi forcus lại trang web `refreshOnForcus` và tự fetch lại data khi mất kết nối `refreshOnReconnect` ta sẽ cần thêm câu lệnh này

```
setupListeners(store.dispatch)
```

Cuối cùng **export** `store` cùng `persistor` để sử dụng

```
export const persistor = persistStore(store);

export default store;
```

> Để sử dụng Redux Toolkit + Redux Persist trong file `main.js` ta cần làm như sau:

```
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

    <Provider store={store}>
        <PersistGate persistor={persistor}>
             <App />
        </PersistGate>
    </Provider>
```

Với `store` và `persistor` vừa được **export** từ `store.js`

> Để sử dụng Redux trong các components Redux hổ trợ 2 hook phổ biến là `useDispatch` và `useSelector`

1. Hook `useSelector()` với `state.app` tương ứng với `_rootReducer.app` trong `useSelector` ta sẽ dùng state để lấy data trong store

```
const data = useSelector(state => state.app);
```

2. Hook `useDispatch()` dùng để dispatch 1 `action` trong Redux. Trong ví dụ ta sẽ gửi 1 action `addTodo` lên store để xữ lý trong reducer của `UserSlice`. Action trong `UserSlice` được khai báo ở `reducer` sẽ tự tạo các action tương ứng

```
const dispatch = useDispatch();

useEffect(() => {
    dispatch(addTodo(12));
},[])
```

### Xử lý các tác vụ Async/Await API bằng createAsyncThunk + extraReducer

1. Tạo Async Funtion

> **createAsyncThunk** sẽ nhận vào 2 tham số, tham số đầu tiên là payload, tham số thứ 2 là 1 thunkAPI để bắt lỗi hoặc cancle Axios bằng `ThunkAPI.abort();`

```
    export const testAsync = createAsyncThunk("/slice/name_function", async ({ page: page }, thunkAPI) => {
    try {
        let res = await getAPI({ page });
        if (res && res.status === 200) {
            return res.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg)
    }
})
```

> Tiếp tục ta sẽ bắt Action trong `extraReducer` của `Slice`

```
extraReducers: (builder) => {
    builder.addCase(testAsync.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload
    })
    builder.addCase(testAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
    })
  },
```

## RTK Query

Ở đây ta sẽ dùng `axios` thay vì `fetch` để dùng RTK Query

1. Ta sẽ custom `AxiosBaseQuery` như sau:

```
import Axios from '../../services/axios/axios';

const axiosBaseQuery = () => async ({ url, method = "GET", data, params, headers }) => {
    try {
        const result = await Axios({ url, method, data, params, headers })
        return { data: result.data }
    } catch (axiosError) {
        let err = axiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

export default axiosBaseQuery;
```

2. Tiếp theo sẽ tạo 1 api config trong RTK Query

```
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';


export const testApi = createApi({
    reducerPath: "test",
    baseQuery: axiosBaseQuery(),
    refetchOnFocus: true,
    tagTypes: ["test"],
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => ({
                url: "/user",
            }),
            providesTags: (result) => {
                result ? [...result.map((item) => ({ type: "test", id: item._id })), { type: "test", id: "default" }] : [{ type: "test", id: "default" }]
            },
        }),
        addTest: builder.mutation({
            query: (body) => ({
                url: "/user",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, err, body) => [{ type: "test", id: result.id }]
        })
    })
})

export const { useGetTestQuery, useAddTestMutation } = testApi
```

-   Với `tagTypes` là key để quản lý các api caching, mutation
-   Với `providerTags` dùng trong các truy vấn **GET** ở đây ta sẽ dùng hàm map để tạo ra các tag cho api này. Vì api này sẽ trả về 1 mảng thì `result` sẽ nhận mảng đó và generate ra các tag tương ứng với các ID của data ngoài ra còn tạo 1 tag mặc định để nhận biết API

```
providesTags:
        (result) => {
            result ? [...result.map((item) => ({ type: "test", id: item._id })), { type: "test", id: "default" }] : [{ type: "test", id: "default" }]
        },
```

-   Với `invalidatesTags` khi api được mutation hoàn tất nó sẽ vào `invalidatesTags` để tạo tag và sẽ kiểm tra trong `providerTags` nếu trùng khớp nó sẽ mutate lại data

> Lưu ý:
> Với các API **GET** (GETS, GET) ta sẽ dùng buider.query. Nếu API GET chỉ 1 data ta sẽ không cần tạo `providerTags`
> Với các API **POST**, **PUT**, **DELETE** ta sẽ dùng builder.mutation. Tất cả phương thức này ta cần tạo invalidateTags để hổ trợ mutation data

3. Tích Hợp RTK Query vào store

```
const _rootReducer = combineReducers({
    [testApi.reducerPath]: testApi.reducer
});

export const store = configureStore({
    reducer: _rootReducer, // Apply Root Reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware, testApi2.middleware),
});
```

4. Sử dụng trong các Components

-   Với Truy Vấn **GET**

```
const {data, isFetching, isLoading} = useGetPostQuery(id, {
    pollingInterval: 3000, // Tự Refresh lại data mỗi 3s
    refetchOnMountOrArgChange: true, // refresh lại data khi Components dc mount
    skip: !id, // Nếu không có id (id == null | undefined) sẽ không fetch data
  })
```

-   Với truy vấn **POST**, **PUT**, **DELETE**

```
const [updatePost, result] = useUpdatePostMutation()
```

trong đó `updatePost` là 1 function để gọi API và `result` là kết quả trả về từ API

5. Bắt lỗi với Middleware của Redux Toolkit

Redux Toolkit hổ trợ 1 Middleware để bắt lỗi toàn app, tất cả các dispatch action api điều sẽ vào đây

```
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'your-cool-library'

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!')
    toast.warn({ title: 'Async error!', message: action.error.data.message })
  }

  return next(action)
}
```

và ở trong `store.js` ta sẽ thêm middleware như sau:

```
export const store = configureStore({
    reducer: _rootReducer, // Apply Root Reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware, rtkQueryErrorLogger),
```
