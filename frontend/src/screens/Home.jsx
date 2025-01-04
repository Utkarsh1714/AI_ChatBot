import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-3 projects">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 text-white transition-all bg-black border rounded-lg project hover:bg-slate-900"
        >
          <i className=" ri-sticky-note-add-line"> New Project</i>
        </button>
        {project.map((project) => (
          <div
            onClick={() =>
              navigate(`/project`, {
                state: { project },
              })
            }
            key={project._id}
            className="flex flex-col gap-2 p-4 transition-all duration-300 border-2 border-black rounded-md cursor-pointer min-w-52 hover:bg-slate-200"
          >
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex gap-2">
              <p>
                <i className="ri-user-line">Collaborators: </i>
              </p>
              {project.users.length}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-md shadow-md">
            <h2 className="mb-4 font-serif text-xl">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block font-mono font-medium tracking-wider text-gray-700 text-md">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition-colors bg-black rounded-md hover:opacity-80"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
