import React from 'react';
import { User } from "@nextui-org/react";

const UserCell = ({ user }: { user: any }) => (
  <User
    avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
    classNames={{
      description: "text-default-500",
    }}
    description={user.email}
    name={user.name}
  >
    {user.email}
  </User>
);

export default UserCell;
