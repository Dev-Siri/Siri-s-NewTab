import { mount } from "svelte";
import "./main.css";

import App from "./App.svelte";

const app = mount(App, { target: document.body });

export default app;
