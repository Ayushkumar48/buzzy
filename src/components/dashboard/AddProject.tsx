import { CloseRounded } from "@mui/icons-material";
import { Divider } from "@mui/joy";
import ColorPallete from "./Modals/ColorPallete";
import { useOpenAddProjectStore } from "../store/openAddProject";

export default function AddProject() {
  const setOpenAddProject = useOpenAddProjectStore(
    (state) => state.setOpenAddProject
  );
  return (
    <div className="h-[21rem] bg-white shadow-xl ring-1 ring-gray-300 rounded-lg w-[30rem]">
      <div className="px-6 py-4 flex flex-row justify-between">
        <span className="font-bold"> Add Project</span>{" "}
        <button onClick={() => setOpenAddProject(false)}>
          <CloseRounded className="p-0.5 text-lg hover:bg-slate-300 rounded-md active:scale-95" />
        </button>
      </div>
      <Divider />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-6 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="outline-none ring-1 py-1 ring-slate-300 pl-2 h-9 rounded-md"
            placeholder="name"
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="color" className="font-bold">
            Color
          </label>

          <ColorPallete />
        </div>
        <div className="flex flex-row gap-4 w-full justify-end">
          <button
            className="px-3.5 py-1.5 hover:bg-gray-300 duration-200 ease-in-out font-semibold bg-gray-200 rounded-lg"
            onClick={() => setOpenAddProject(false)}
          >
            Cancel
          </button>
          <button
            className="px-3.5 py-1.5 hover:bg-emerald-600 duration-200 ease-in-out font-semibold bg-emerald-500 text-white rounded-lg"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
