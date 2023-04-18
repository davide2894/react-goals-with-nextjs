function ButtonIcon(props: { iconName: string }) {
  return (
    <span
      className="block w-[25px] h-[25px] bg-no-repeat bg-center bg-contain hover:scale-150 group-disabled:pointer-events-none group-disabled:opacity-50 hover:cursor-pointer"
      style={{
        backgroundImage: `url("./${props.iconName}.svg")`,
      }}></span>
  );
}

export default ButtonIcon;
