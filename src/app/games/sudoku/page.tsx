import SudokuGame from "@/games/sudoku/SudokuGame";

export default function Page() {
  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">🧩 Sudoku</h1>
      <SudokuGame />
    </div>
  );
}