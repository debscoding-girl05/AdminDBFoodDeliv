import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  BarChart,
  XAxis,
  Bar,
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

import chartData from "@/data/chartData.json"

const barchartConfig = {
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-1))",
  },
  dislikes: {
    label: "Dislikes",
    color: "hsl(var(--chart-2))",
  },
}satisfies ChartConfig;

export default function BarchartTutoLike() {
    const likedDisltTutoData= chartData.likedDislikedTutorialsData;
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Tutoriels les plus/Moins Aimés</CardTitle>
          <CardDescription>JAnnée 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barchartConfig}>
            <BarChart accessibilityLayer data={likedDisltTutoData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="tutorial"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
              <Bar dataKey="dislikes" fill="var(--color-dislikes)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Augmentation 5.2% ce mois <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Tutoriels les plus/Moins Aimés
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
