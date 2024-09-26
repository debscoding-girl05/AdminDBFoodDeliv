import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Sector,
  CartesianGrid,
  BarChart,
  XAxis,
  Bar,
  Area,
  AreaChart,
  Line,
  LineChart,
  LabelList,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


export default function AreachartInscrip({
  data,
}: {
  data: Array<{ month: string; consultations: number; signups: number }>;
  
}) {
 const chartData = React.useMemo(() => data, [data]);



  const chartConfig = {
    consultations: {
      label: "Consultations",
      color: "hsl(var(--chart-3))",
    },
    signups: {
      label: "Signups",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Taux D'inscriptions</CardTitle>
          <CardDescription>
            Compare nombres Visiteurs et nombres d'inscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
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
                interval={0}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient
                  id="fillconsultations"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-consultations)"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-consultations)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillsignups" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-signups)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-signups)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="consultations"
                type="natural"
                fill="var(--color-consultations)"
                fillOpacity={0.4}
                stroke="var(--color-consultations)"
                stackId="a"
              />
              <Area
                dataKey="signups"
                type="natural"
                fill="var(--color-signups)"
                fillOpacity={0.4}
                stroke="var(--color-signups)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Janvier - Decembre 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
