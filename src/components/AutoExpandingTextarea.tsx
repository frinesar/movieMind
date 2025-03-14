function AutoExpandingTextarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none field-sizing-content font-userText outline-none text-justify "
      placeholder="Tap to start writing your review"
    />
  );
}
export default AutoExpandingTextarea;
