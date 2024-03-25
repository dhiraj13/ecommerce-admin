import { Table } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteOrder, getOrders, updateOrder } from "@features/auth/authSlice"
import { Link } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import CustomModal from "@components/CustomModal"

const Orders = () => {
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState("")
  const showModal = (e) => {
    setOpen(true)
    setOrderId(e)
  }

  const hideModal = () => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  const authState = useSelector((state) => state.auth)
  const { orders } = authState

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
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
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ]
  const data1 = []
  for (let i = 0; i < orders.length; i++) {
    data1.push({
      key: i + 1,
      name: orders[i]?.user?.firstname,
      product: <Link to={`/admin/orders/${orders[i]?._id}`}>View Orders</Link>,
      amount: orders[i]?.totalPrice,
      date: new Date(orders[i]?.createdAt).toLocaleString(),
      action: (
        <>
          {/* <Link className="fs-4 text-danger" to="/">
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(orders[i]._id)}
          >
            <AiFillDelete />
          </button> */}
          <select
            name=""
            defaultValue={orders[i]?.orderStatus}
            onChange={(e) => udpateOrderStatus(orders[i], e.target.value)}
            className="form-control form-select"
            id=""
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Our For Delivery</option>
            <option value="Delivery">Delivery</option>
          </select>
        </>
      ),
    })
  }

  const handleDeleteCoupon = async (id) => {
    await dispatch(deleteOrder(id))
    await dispatch(getOrders())
    setOpen(false)
  }

  const udpateOrderStatus = (order, value) => {
    dispatch(updateOrder({ id: order?._id, status: value }))
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteCoupon(orderId)}
        title="Are you sure you want to delete this order?"
      />
    </div>
  )
}

export default Orders
