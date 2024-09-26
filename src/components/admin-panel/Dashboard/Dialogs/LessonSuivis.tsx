import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Import the JSON data
import chartData from "@/data/chartData.json";

export function DialogLessonSuivis() {
  const lessonsSuivis = chartData.coursLesPluSuivis;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-400 rounded-lg p-2 text-white"
          variant="outline"
        >
          Voir Tout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-70">
        <DialogHeader>
          <DialogTitle>Table Cours-Suivis</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>
            Une Liste de Cours, leurs mois, et le temps de Suivis.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Mois</TableHead>
              <TableHead className="text-right">Temp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessonsSuivis.length > 0 ? (
              lessonsSuivis.map((lessonSuivis, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{lessonSuivis.lesson}</TableCell>
                  <TableCell>{lessonSuivis.month}</TableCell>{" "}
                  {/* Display the month */}
                  <TableCell className="text-right">
                    {lessonSuivis.duration} minutes
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No courses available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
