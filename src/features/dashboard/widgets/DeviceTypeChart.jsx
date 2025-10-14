import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { getDeviceCountByType } from '@/api/dashboard/dashboard';
import React, { useEffect, useState } from 'react';
import { showError } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';

const DeviceTypeChart = () => {
    const [data, setData] = useState([]);

    const loadDeviceCountByType = async () => {
        try {
            const result = await getDeviceCountByType();

            if (result.success) {
                setData(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비구분별 장비수 통계 조회 실패', err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadDeviceCountByType();
    }, []);

    useEffect(() => {
        const root = am5.Root.new('deviceTypeChartDiv');
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
                categoryField: 'deviceType',
                legendLabelText: '{category}',
                legendValueText: '{value}',
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{category}: {value}대',
                }),
            })
        );

        // // 파이차트 크기 조정
        // series.setAll({
        //     radius: am5.percent(70),
        //     innerRadius: am5.percent(0),
        // });

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
            <h2 className="text-lg font-semibold mb-2">장비구분별 장비수</h2>
            <div id="deviceTypeChartDiv" className="w-full h-[300px]" />
        </>
    );
};

export default DeviceTypeChart;
