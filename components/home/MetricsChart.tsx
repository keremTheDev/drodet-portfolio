"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { metricsData } from "@/lib/data";

const colors = ["#d97757", "#cc6c4d", "#bf6246", "#b4573d"];
const chartData = metricsData.map((item) => ({ ...item }));

export function MetricsChart() {
  return (
    <div className="h-[320px] w-full sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#1414131A" vertical={false} />
          <XAxis
            dataKey="metrik"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#5e5d59", fontSize: 12, fontFamily: "Inter" }}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#5e5d59", fontSize: 12, fontFamily: "JetBrains Mono" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(217, 119, 87, 0.08)" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #1414131A",
              backgroundColor: "#ffffff",
              boxShadow: "none"
            }}
            labelStyle={{
              color: "#141413",
              fontFamily: "Inter",
              fontWeight: 700
            }}
            formatter={(value: number) => [`%${value.toFixed(1)}`, "Skor"]}
          />
          <Bar dataKey="oran" radius={[8, 8, 0, 0]}>
            {chartData.map((item, index) => (
              <Cell key={item.metrik} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
