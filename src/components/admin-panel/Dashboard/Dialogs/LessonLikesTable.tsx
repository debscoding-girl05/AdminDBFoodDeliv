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

export function DialogLessonLike() {
  const likedlessons = chartData.coursLesPlusLikes; 

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
          <DialogTitle>Table Cours-Likes</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>
            Une Liste de Cours, leurs mois, et les likes reçus.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Mois</TableHead>
              <TableHead className="text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {likedlessons.length > 0 ? (
              likedlessons.map((likelesson, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{likelesson.lesson}</TableCell>
                  <TableCell>{likelesson.month}</TableCell>{" "}
                  {/* Display the month */}
                  <TableCell className="text-right">
                    {likelesson.likes} likes
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
