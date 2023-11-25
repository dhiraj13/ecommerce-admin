import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Colorlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color);
  const { colors } = colorState;

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
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < colors.length; i++) {
    data1.push({
      key: i + 1,
      name: colors[i].title,
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
    });
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="title">Colors</h3>
        <button
          className="btn btn-primary rounded-3"
          onClick={() => navigate("/admin/color")}
        >
          Add
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Colorlist;
