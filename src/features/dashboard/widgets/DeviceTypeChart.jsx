import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { getDeviceCountByType } from '@/api/dashboard/dashboard';
import React, { useLayoutEffect } from 'react';
import { showError } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';

const DeviceTypeChart = () => {
    const loadDeviceCountByType = async () => {
        try {
            const result = await getDeviceCountByType();

            if (result.success) {
                return result.data;
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비구분별 장비수 통계 조회 실패', err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useLayoutEffect(() => {
        const root = am5.Root.new('deviceTypeChartDiv');
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            })
        );

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

        series.labels.template.setAll({
            text: '{category}\n{value}대',
            fontSize: 12,
            textAlign: 'center',
        });

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

        loadDeviceCountByType().then((data) => {
            series.data.setAll(data);
            legend.data.setAll(series.dataItems);
        });

        return () => {
            root.dispose();
        };
    }, []);

    return <div id="deviceTypeChartDiv" className="w-full h-[300px]" />;
};

export default DeviceTypeChart;
