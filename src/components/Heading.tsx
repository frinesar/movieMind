function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex gap-4">
      <div className="w-1 bg-accent h-full min-h-10 rounded-full" />
      <p className="font-main text-4xl font-medium">{children}</p>
    </div>
  );
}

export default Heading;
