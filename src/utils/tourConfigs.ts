export const steps = [
  {
    selector: ".layout",
    content: "Hi there! Welcome to Goal Tracker",
  },
  {
    selector: ".goal",
    content: "This is a goal",
  },
  {
    selector: ".score",
    content:
      "Here you can see how many times you hit your goal. For example: right now you hit your goal 0 times out of 5",
  },
  {
    selector: ".scoreButtons",
    content:
      "By clicking these buttons you can increase or decrease your score",
  },
  {
    selector: ".editButton",
    content: "This is the button you need for editing your goal",
  },
  {
    selector: ".deleteButton",
    content:
      "But this is what you want to click when you have enough of this goal",
  },
  {
    selector: ".resetButton",
    content: "If you want to reset the goal score you should use this button",
  },
  {
    selector: ".newGoalButton",
    content:
      "Finally, if you want to add a goal you should use click this button",
  },
];

export const styles = {
  popover: (base: any) => ({
    ...base,
    color: "black",
    borderRadius: 5,
    "--reactour-accent": "rgb(234 179 8)",
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transform: "auto",
    maxWidth: "280px",
  }),
  badge: (base: any) => ({
    ...base,
    color: "black",
    fontWeight: "700",
  }),
  close: (base: any) => ({
    ...base,
    top: "5px",
    right: "10px",
    width: "12px",
  }),
  controls: (base: any) => ({ ...base, marginTop: 100 }),
  maskWrapper: (base: any) => ({
    ...base,
    backgroundColor: "white",
    opacity: "0.5",
    height: "100%",
    width: "100%",
    borderRadius: 5,
  }),
};
