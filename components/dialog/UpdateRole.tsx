import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import Image from "next/image";
import userImg from "../../public/images/149071.png";
import { TUser } from "@/types";
import { useUpdateRoleMutation } from "@/redux/feature/user/userApi";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    user: TUser | null;
};

const UpdateRole = ({ isOpen, setIsOpen, user }: Props) => {
    const [selectedRole, setSelectedRole] = useState(user?.role);
    const [updateRole, { isSuccess, error }] = useUpdateRoleMutation();

    // Update selectedRole when user prop changes or dialog is opened
    useEffect(() => {
        setSelectedRole(user?.role);
    }, [user, isOpen]);

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("User role changed successfully!");
        }
        if (error) {
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const isRoleChanged = selectedRole !== user?.role;

    const handleUpdateRole = async () => {
        if (user?._id && isRoleChanged) {
            await updateRole({ role: selectedRole, id: user._id });
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="max-w-[370px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-Poppins">Update Role</DialogTitle>
                </DialogHeader>
                <div className="mt-2 font-Poppins">
                    <Image
                        className="rounded-full w-28 h-28 mx-auto object-cover"
                        alt="profile"
                        src={user?.avater?.url ? user?.avater?.url : userImg}
                        width={100}
                        height={100}
                    />
                    <div className="mt-2 flex items-center gap-2">
                        <h2>Name :</h2>
                        <h1>{user?.name}</h1>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <h2>Email :</h2>
                        <h1>{user?.email}</h1>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <h2>Role :</h2>
                        <Select
                            value={selectedRole}
                            onValueChange={handleRoleChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem disabled={user?.role === "Admin"} value="User">
                                    User
                                </SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={!isRoleChanged}
                        onClick={handleUpdateRole}
                    >
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateRole;
