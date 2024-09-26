import {
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import chartData from "@/data/chartData.json";
import { TrendingUp } from "lucide-react";


const horiChartConfig = {
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export default function HoriBarchartTutoCom() {
    const TutoCom= chartData.mostCommentedTutorialsData;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Tutoriels les plus Commentés</CardTitle>
          <CardDescription>Année 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={horiChartConfig}>
            <BarChart
              accessibilityLayer
              data={TutoCom}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="comments" hide />
              <YAxis
                dataKey="tutorial"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="comments" fill="var(--color-comments)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Augmentation 5.2% ce mois <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Tutoriels les plus commentés
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
