import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import authService from "./authService"
import { toast } from "react-toastify"

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null
const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  order: null,
  deletedOrder: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getMonthlyOrders = createAsyncThunk(
  "auth/get-monthly-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getMonthlyOrders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getYearlyOrders = createAsyncThunk(
  "auth/get-yearly-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getYearlyStats()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(
  "auth/admin-logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logout()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getOrders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateOrder = createAsyncThunk(
  "order/update-order",
  async (data, thunkAPI) => {
    try {
      return await authService.udpateOrder(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  "order/delete-order",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteOrder(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetAuthState = createAction("Reset_all_auth")

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = false
        state.user = action.payload
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload || []
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
        toast.success("Order status updated successfully")
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getMonthlyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMonthlyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.monthlyOrders = action.payload
      })
      .addCase(getMonthlyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getYearlyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getYearlyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.yearlyOrders = action.payload
      })
      .addCase(getYearlyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deletedOrder = action.payload
        toast.success("Order deleted successfully")
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetAuthState, () => initialState)
  },
})

export default authSlice.reducer
