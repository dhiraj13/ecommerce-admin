import { Table } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrder } from "@features/auth/authSlice"
import { Link, useParams } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

const ViewOrder = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { order } = useSelector((state) => state.auth)
  console.log({ order })

  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id])

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ]
  const data1 = []
  for (let i = 0; i < order?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: order?.orderItems?.[i]?.product?.title,
      brand: order?.orderItems?.[i]?.product?.brand,
      count: order?.orderItems?.[i]?.quantity,
      amount: order?.orderItems?.[i]?.price,
      color: order?.orderItems?.[i]?.color?.title,
      action: (
        <>
          <Link className="fs-4 text-danger" to="/">
            <BiEdit />
          </Link>
          <Link className="ms-2 fs-4 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    })
  }

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default ViewOrder
