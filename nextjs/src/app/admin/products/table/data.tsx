const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "SKU", uid: "sku", sortable: true },
    { name: "PRICE", uid: "price", sortable: true },
    { name: "QUANTITY", uid: "quantity", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Inactive", uid: "inactive" },
];

const INITIAL_VISIBLE_COLUMNS = [
    'id',
    'name',
    'sku',
    'price',
    'quantity',
    'status',
    'actions',
];

export { columns, statusOptions, INITIAL_VISIBLE_COLUMNS };
