import axios from "../axios";
import { toast } from "react-toastify";

class ChangePlainlyAccess {
  #access;
  #projects;
  #length;
  #counter;
  #errors;
  constructor(access, projects) {
    this.#access = access;
    this.#projects = projects;
    this.#length = projects?.length;
    this.#counter = 0;
    this.#errors = 0;
  }
  #wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async #updateOne(project) {
    let message = { project, again: true, access: this.#access };
    let part = 0;
    const finish = async (message, part) => {
      return axios({
        url: "projects/changePlainlyAccess",
        method: "post",
        data: { message, part },
      })
        .then((res) => res.data)
        .then(({ message: m, part: p }) => {
          message = { ...message, ...m };
          part = p;
          console.log({ message: m, part: p });
          if (part == 9) {
            toast.error(message.error, { autoClose: 1000 * 30 });
            return this.#errors++;
          } else if (part < 4) finish(message, part);
          else if (part == 4) {
            toast.success(
              "تم رفع التصميم" + " " + project.name + " " + "بنجاح",
              { autoClose: 1000 * 30 }
            );
            return this.#counter++;
          }
        });
    };
    return finish(message, part);
  }
  async #isDone() {
    console.log({
      done: this.#counter,
      error: this.#errors,
      all: this.#length,
    });
    if (this.#counter + this.#errors == this.#length) {
      if (this.#counter / this.#length > 0.8)
        await axios({
          url: "projects/changePlainlyAccess",
          method: "post",
          data: { message: { access: this.#access }, part: 4 },
        });
      toast.success("تم نقل" + " " + this.#counter + " " + "تصميم بنجاح", {
        autoClose: 1000 * 30,
      });
      if (this.#errors)
        return toast.error("فشل فى نقل" + " " + this.#errors + " " + "تصميم", {
          autoClose: 1000 * 30,
        });
    } else {
      await this.#wait(5000);
      return this.#isDone();
    }
  }
  async update() {
    toast.success("جارى نقل" + " " + this.#length + " " + "تصميم", {
      autoClose: 1000 * 30,
    });
    for (const project of this.#projects) this.#updateOne(project);
    return this.#isDone();
  }
}
export default ChangePlainlyAccess;
