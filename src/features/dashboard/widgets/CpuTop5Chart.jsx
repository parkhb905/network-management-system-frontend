import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect, useState } from 'react';
import { getCpuTop5 } from '@/api/dashboard/dashboard';
import { showError } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';

export default function CpuTop5Chart() {
    const [period, setPeriod] = useState('24h');
    const [data, setData] = useState([]);

    const loadCpuTop5 = async () => {
        try {
            const result = await getCpuTop5();

            if (result.success) {
                setData(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('CPU TOP5 장비 조회 실패', err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadCpuTop5();
    }, [period]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const root = am5.Root.new('cpuTop5Chart');
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX',
                layout: root.verticalLayout,
            })
        );

        // X축 (장비명)
        const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'deviceName',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        // Y축 (CPU 사용률)
        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
                min: 0,
                max: 100,
            })
        );

        // 시리즈 (막대)
        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'CPU 사용률',
                xAxis,
                yAxis,
                valueYField: 'avgCpuUsage',
                categoryXField: 'deviceName',
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{categoryX}: {valueY}% ({collectedAt})',
                }),
            })
        );

        // 막대 스타일
        series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            fillOpacity: 0.9,
            strokeOpacity: 0,
        });

        // 데이터 설정
        xAxis.data.setAll(data);
        series.data.setAll(data);

        // 애니메이션
        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [data]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">CPU 사용률 TOP5</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPeriod('24h')}
                        className={`px-2 py-1 text-sm rounded ${
                            period === '24h'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        24시간
                    </button>
                    <button
                        onClick={() => setPeriod('7d')}
                        className={`px-2 py-1 text-sm rounded ${
                            period === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        7일
                    </button>
                </div>
            </div>

            <div id="cpuTop5Chart" className="w-full h-[320px]" />

            {data?.[0]?.collectedAt && (
                <div className="text-right text-sm text-gray-500 mt-2">
                    최근 수집 시각: {new Date(data[0].collectedAt).toLocaleString('ko-KR')}
                </div>
            )}
        </div>
    );
}
