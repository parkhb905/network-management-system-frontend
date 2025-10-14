import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { getDeviceCountByVendor } from '@/api/dashboard/dashboard';
import { showError } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';

const VendorChart = () => {
    const [data, setData] = useState([]);

    const loadDeviceCountByVendor = async () => {
        try {
            const result = await getDeviceCountByVendor();

            if (result.success) {
                setData(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('제조사별 장비수 통계 조회 실패', err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadDeviceCountByVendor();
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const root = am5.Root.new('vendorChartDiv');
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            })
        );

        // 시리즈 (파이)
        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: 'count',
                categoryField: 'vendor',
                legendLabelText: '{category}',
                legendValueText: '{value}',
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{category}: {value}대',
                }),
            })
        );

        // 라벨 스타일
        series.labels.template.setAll({
            text: '{category}\n{value}대',
            fontSize: 12,
            textAlign: 'center',
        });

        // 범례 설정
        const legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
            })
        );

        // legend에 category만 보이게 valueLabels hidden 처리
        legend.valueLabels.template.setAll({
            forceHidden: true,
        });

        // legend의 category label만 유지
        legend.labels.template.setAll({
            fontSize: 13,
        });

        // 데이터 바인딩
        series.data.setAll(data);
        legend.data.setAll(series.dataItems);

        // 애니메이션
        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [data]);

    return (
        <>
            <h2 className="text-lg font-semibold mb-2">제조사별 장비수</h2>
            <div id="vendorChartDiv" className="w-full h-[300px]" />
        </>
    );
};

export default VendorChart;
