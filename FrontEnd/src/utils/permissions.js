
const permissions = {
    admin: {
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canRegister: false
    },
    user: {
        canApprove: false,
        canEdit: true,
        canDelete: false,
        canRegister: true
    }
};

export default permissions;
