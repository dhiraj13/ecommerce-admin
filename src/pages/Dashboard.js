import { Column } from "@ant-design/plots"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  getMonthlyOrders,
  getOrders,
  getYearlyOrders,
} from "@features/auth/authSlice"
import { If, Then } from "react-if"

const Dashboard = () => {
  const [ordersMonthly, setOrdersMonthly] = useState([])
  const [ordersMonthlySales, setOrdersMonthlySales] = useState([])
  const [orderData, setOrderData] = useState([])
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const { monthlyOrders, orders, yearlyOrders } = authState

  useEffect(() => {
    dispatch(getMonthlyOrders())
    dispatch(getYearlyOrders())
    dispatch(getOrders())
  }, [dispatch])

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    let data = []
    let monthlyOrderCount = []
    for (let index = 0; index < monthlyOrders?.length; index++) {
      const element = monthlyOrders?.[index]

      if (element._id?.month) {
        data.push({
          type: monthNames?.[element._id?.month],
          income: element?.amoount,
        })
        monthlyOrderCount.push({
          type: monthNames?.[element._id?.month],
          sales: element?.count,
        })
      }
    }
    setOrdersMonthly(data)
    setOrdersMonthlySales(monthlyOrderCount)

    const data1 = []
    for (let i = 0; i < orders?.length; i++) {
      data1.push({
        key: i,
        name: orders?.[i]?.user?.firstname + " " + orders?.[i]?.user?.lastname,
        product: orders?.[i]?.orderItems?.length,
        price: orders?.[i]?.totalPrice,
        dprice: orders?.[i]?.totalPriceAfterDiscount,
        status: orders?.[i]?.orderStatus,
      })
    }
    setOrderData(data1)
  }, [monthlyOrders, yearlyOrders, orders])

  const config = {
    data: ordersMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333"
    },
    label: {
      // position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  }
  const config2 = {
    data: ordersMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333"
    },
    label: {
      // position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  }
  const columns = [
    {
      title: "SNo",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Total Price",
      dataIndex: "price",
    },
    // {
    //   title: "Total Price After Discount",
    //   dataIndex: "dprice",
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
  ]

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">${yearlyOrders?.[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearlyOrders?.[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statics</h3>
          <If condition={ordersMonthly?.length > 0}>
            <Then>
              <div>
                <Column {...config} />
              </div>
            </Then>
          </If>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statics</h3>
          <If condition={ordersMonthlySales?.length > 0}>
            <Then>
              <div>
                <Column {...config2} />
              </div>
            </Then>
          </If>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
