import axios from "axios";

export async function getRuntimes() {
  try {
    const response = await axios.get("/api/piston/runtimes");
    return response.data;
  } catch (err: any) {
    return { error: err?.message || "Failed to fetch runtimes" };
  }
}

export async function executeCode(language: string, source: string) {
  try {
    const response = await axios.post("/api/piston/execute", { language, source }, {
      headers: { "Content-Type": "application/json" }
    });
    const { run } = response.data;
    if (run?.output) return { output: run.output };
    if (run?.stderr) return { error: run.stderr };
    return { output: "No output." };
  } catch (err: any) {
    return { error: err?.message || "Failed to execute code" };
  }
}
