import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useLayoutEffect } from 'react';
// import api from '@/api/axiosInstance';

export default function MemoryTop5Chart() {
    useLayoutEffect(() => {
        const root = am5.Root.new('memTop5Chart');
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
                layout: root.verticalLayout,
            })
        );

        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: 'minute', count: 5 },
                renderer: am5xy.AxisRendererX.new(root, {}),
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                max: 100,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        // api.get('/api/dashboard/resource/memory-top5').then((res) => {
        //     const data = res.data;

        //     const grouped = data.reduce((acc, cur) => {
        //         const id = cur.deviceName || `Device-${cur.deviceId}`;
        //         acc[id] = acc[id] || [];
        //         acc[id].push({ time: new Date(cur.time).getTime(), value: cur.memoryUsage });
        //         return acc;
        //     }, {});

        //     Object.keys(grouped).forEach((deviceName, i) => {
        //         const color = chart.get('colors').getIndex(i);
        //         const series = chart.series.push(
        //             am5xy.LineSeries.new(root, {
        //                 name: deviceName,
        //                 xAxis,
        //                 yAxis,
        //                 valueYField: 'value',
        //                 valueXField: 'time',
        //                 stroke: color,
        //             })
        //         );
        //         series.data.setAll(grouped[deviceName]);
        //     });

        //     const legend = chart.children.push(am5.Legend.new(root, {}));
        //     legend.data.setAll(chart.series.values);
        // });

        return () => root.dispose();
    }, []);

    return <div id="memTop5Chart" className="w-full h-[300px]" />;
}
