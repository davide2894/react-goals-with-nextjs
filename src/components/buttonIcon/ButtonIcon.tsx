function ButtonIcon(props: { iconName: string; customCssClasses?: string }) {
  let defaultClasses =
    "block w-[25px] h-[25px] bg-no-repeat bg-center bg-contain hover:scale-150 group-disabled:pointer-events-none group-disabled:opacity-50 hover:cursor-pointer";

  let componentCssClasses: string;

  if (props.customCssClasses) {
    componentCssClasses = `${defaultClasses} ${props.customCssClasses}`;
  } else {
    componentCssClasses = defaultClasses;
  }

  return (
    <span
      className={componentCssClasses}
      style={{
        backgroundImage: `url("./${props.iconName}.svg")`,
      }}></span>
  );
}

export default ButtonIcon;
