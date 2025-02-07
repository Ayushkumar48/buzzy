import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { InfoRounded } from "@mui/icons-material";
import MyPopover from "./Popover";
import { getUserData, updateProfile } from "@/db";
import { toast } from "react-toastify";

export default function ExampleDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = React.useState<{
    firstname: string;
    lastname: string;
    password: string;
    username: string;
  }>({
    firstname: "",
    lastname: "",
    password: "",
    username: "",
  });
  const [open, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      setUserData({
        firstname: user.firstname,
        lastname: user.lastname,
        password: "",
        username: user.username,
      });
    };
    fetchUserData();
  }, []);
  async function handleSave() {
    try {
      const res = await toast.promise(updateProfile(userData), {
        pending: "Updating profile, please wait...",
        success: "Profile updated successfully.",
        error: "Error while updating profile!",
      });
      if (res.success) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-[40rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <Dialog.Title className="-mt-1.5 mb-1 text-2xl font-bold py-2">
            Profile Details
          </Dialog.Title>
          <div className="mb-6 text-gray-600 text-lg">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="firstname" className="font-semibold">
                    First Name
                  </label>
                  <input
                    placeholder="First Name"
                    id="firstname"
                    name="firstname"
                    type="text"
                    className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
                    value={userData.firstname}
                    onChange={(e) =>
                      setUserData({ ...userData, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="firstname" className="font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
                    value={userData.lastname}
                    onChange={(e) =>
                      setUserData({ ...userData, lastname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <div className="flex flex-row justify-center items-center">
                  <input
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800 disabled:cursor-not-allowed"
                    disabled
                    value={userData.username}
                  />
                  <MyPopover data="Username can't be changed.">
                    <InfoRounded />
                  </MyPopover>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <div className="flex flex-row justify-center items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                  <MyPopover
                    data="For security reasons, your password is not displayed. However, you
                                can update it here."
                  >
                    <InfoRounded />
                  </MyPopover>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-6 font-bold text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
              Close
            </Dialog.Close>
            <button
              className="px-6 py-1.5 hover:bg-emerald-600 outline-none duration-200 ease-in-out font-bold bg-emerald-500 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-30"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
