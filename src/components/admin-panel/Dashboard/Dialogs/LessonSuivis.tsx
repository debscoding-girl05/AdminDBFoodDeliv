import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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


export function DialogLessonSuivis() {
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
          <TableCaption>Une Liste de Cours et les likes reçus.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead className="text-right">Personnes Suivant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>chapitre1</TableCell>
              <TableCell>2 heures</TableCell>
              <TableCell className="text-right">20 likes</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
