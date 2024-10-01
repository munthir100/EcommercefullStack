import React from 'react';
import { Chip } from "@nextui-org/react";

// Define the allowed status types  
type Status = 'active' | 'inactive' | 'paused' | 'vacation';

// Define the possible color values that Chip can take  
type Color = 'success' | 'danger' | 'warning' | 'default' | 'primary' | 'secondary';

// Create a mapping from status to the corresponding colors  
const statusColorMap: Record<Status, Color> = {
  active: "success",
  inactive: "default",
  paused: "danger",
  vacation: "warning",
};

// Component that accepts a status prop  
const StatusChip = ({ status }: { status: Status }) => (
  <Chip
    className="capitalize border-none gap-1 text-default-600"
    color={statusColorMap[status]}
    size="sm"
    variant="dot"
  >
    {status}
  </Chip>
);

export default StatusChip;