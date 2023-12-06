import { useEffect, useState } from "react";
import getUsers from "../api/getUsers";
import Table from "../table/Table";
import styles from "./style.module.css";

// consumed: 0;
// created: "2023-10-18T07:25:14.275Z";
// email: "mostafadragonx@gmail.com";
// id: "652f885a0ded17ca43ca6cb5";
// loveIDs: ["6526de3ef966e40cb86093a8"];
// name: "Mostafa Khairy Ebrahem";
// password: "112128956914731980367";
// picture: "https://lh3.googleusercontent.com/a/ACg8ocL6PXO7SfSDHEhoVaJPd_gfCgZP2CJ2Z4vQAYGjFfVFKMM=s96-c";
// planId: "651e4894f494d22e32cfb998";
// planStart: "2023-10-31T00:29:59.751Z";
// pushToken: "ExponentPushToken[Il8LtQDdUNAAjPZ72QCuVX]";
// verificationCode: 10000;
// verified: true;
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);
  const rows = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created: user.created,
      loves: user.loveIDs?.length,
      picture: user.picture,
    };
  });
  const columns = [
    {
      type: "picture",
      field: "picture",
      headerName: "المستخدم",
      renderCell: (x) => (
        <img src={x.value} alt="image" className={styles.image} />
      ),
    },
    { type: "string", field: "name", headerName: "الاسم", width: "200" },
    {
      type: "string",
      field: "email",
      headerName: "البريد",
      width: "250",
    },
    {
      type: "date",
      field: "created",
      headerName: "مشترك منذ",
      valueGetter: ({ value }) => value && new Date(value),
      width: 120,
    },
    {
      align: "center",
      type: "number",
      field: "loves",
      headerName: "معجب بي",
    },
  ];
  return (
    <div>
      <Table rows={rows} columns={columns} onRowClick={() => null} />
    </div>
  );
};

export default Users;
