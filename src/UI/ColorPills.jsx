import { useTheme } from '../contexts/ThemeContext';

const baseColors = {
  yellow: '#FFD700', // yellow hex code
  slate: '#64748b', // same as before
  red: '#fb7185', // red hex code
  green: '#86efac', // green hex code
  pink: '#f9a8d4', // pink hex code
  orange: '#FFA500', // orange hex code
  emerald: '#d8b4fe', // emerald hex code
  zinc: '#0369a1', // zinc hex code
};
const ColorPills = () => {
  const { setTheme } = useTheme(); // Access the setTheme function to change the theme
  return (
    <div className="mx-5 my-5 flex justify-end space-x-1">
      {Object.keys(baseColors).map((color) => (
        <button
          key={color}
          style={{ backgroundColor: baseColors[color] }}
          className="border-1 h-7 w-7 rounded-full border-zinc-700" // Show the color intensity at the pill level
          onClick={() => setTheme(color)} // Send the base color to the parent component
        />
      ))}
    </div>
  );
};

export default ColorPills;
