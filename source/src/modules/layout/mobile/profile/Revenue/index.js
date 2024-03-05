import Healing from '@components/common/elements/Healing';
import React from 'react';
import styles from './index.module.scss';
import { Badge, Group, Paper, Text, Table, Avatar, Box, Image, Divider, Button, Grid } from '@mantine/core';
import Iconarow from '@assets/icons/increasearow.svg';
import Typo from '@components/common/elements/Typo';
import Downarrow from '@assets/icons/dowarow.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import { ReactComponent as Close } from '@assets/icons/close.svg';

const message = defineMessages({
    revenue: 'Doanh thu ',
});
const Revenue = () => {
    const navigate = useNavigate();
    const translate = useTranslate();
    return (
        <div style={{ width: '100%' }}>
            <div className={styles.titleProfile}>
                <Typo size="small" type="bold" style={{ color: 'var(--text-color)' }}>
                    {translate.formatMessage(message.revenue)}
                </Typo>
                <div className={styles.iconClose}>
                    <i
                        className={styles.iconClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(generatePath(routes.profilePage.path), {
                                state: { action: 'home', prevPath: location.pathname },
                            });
                        }}
                    >
                        <Close />
                    </i>
                </div>
            </div>
            <Box pt="30" pb="20">
                <Group gap={10}>
                    <Typo size="tiny" type="semi" style={{ color: 'var(--input-color)' }}>
                        <FormattedMessage defaultMessage={'Show:'} />
                    </Typo>
                    <Button variant="light" radius="md" size="xs">
                        <Group gap="5">
                            <Typo size="sub" type="semi">
                                <FormattedMessage defaultMessage={'Tháng này'} />
                            </Typo>
                            <Image src={Downarrow} />
                        </Group>
                    </Button>
                </Group>
            </Box>
            <Grid grow gutter="sm">
                <Grid.Col span={6}>
                    <Paper shadow="lg" withBorder p="10" radius="md">
                        <Text size="var(--small-font-size)" color="var(--input-color)">
                            <FormattedMessage defaultMessage={'Tổng số học viên'} />
                        </Text>
                        <Group align="center" mt={10} justify={'space-between'}>
                            <Text size="var(--sub-font-size)">
                                <FormattedMessage defaultMessage={'1,540'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" p="5">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="lg" withBorder p="10" radius="md">
                        <Text size="var(--small-font-size)" color="var(--input-color)">
                            <FormattedMessage defaultMessage={'Tổng số học viên'} />
                        </Text>
                        <Group align="center" mt={10} justify={'space-between'}>
                            <Text size="var(--sub-font-size)">
                                <FormattedMessage defaultMessage={'1,540'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" p="5">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="lg" withBorder p="10" radius="md">
                        <Text size="var(--small-font-size)" color="var(--input-color)">
                            <FormattedMessage defaultMessage={'Tổng thu (VND)'} />
                        </Text>
                        <Group align="center" mt={10} justify={'space-between'}>
                            <Text size="var(--sub-font-size)">
                                <FormattedMessage defaultMessage={'12,450,000'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" p="5">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="lg" withBorder p="10" radius="md">
                        <Text size="var(--small-font-size)" color="var(--input-color)">
                            <FormattedMessage defaultMessage={'Phí hoa hồng'} />
                        </Text>
                        <Group align="center" mt={10} justify={'space-between'}>
                            <Text size="var(--sub-font-size)">
                                <FormattedMessage defaultMessage={'2,540,000'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" p="5">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default Revenue;
