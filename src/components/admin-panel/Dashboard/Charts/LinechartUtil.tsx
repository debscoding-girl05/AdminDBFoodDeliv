import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  LabelList,
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


export default function LinechartUtil({data}:{
    data: Array<{month: string; users:number}>;
}) {

    const chartData= React.useMemo(()=> data, [data]);

    const chartConfig = {
      users: {
        label: "Users",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Nombre d'Utilisateurs</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                interval={0}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="users"
                type="natural"
                stroke="var(--color-users)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-users)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Montre le nombre de Visiteurs ces derniers six Mois
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
