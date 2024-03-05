/* eslint-disable array-bracket-spacing */
import React, { useEffect, useState } from 'react';
import styles from '../AppHeader.module.scss';
import Container from '@components/common/elements/Container';
import { Button, Center, Divider, Flex, Input, Text, TextInput, Title } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import back from '@assets/icons/back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import star from '@assets/icons/starIcon.svg';
import starDone from '@assets/icons/starIconDone.svg';
import dots from '@assets/icons/dots.svg';
import avatar from '@assets/images/avatar_profile.png';
import BasicModal from '@components/common/form/BasicModal';
import useDisclosure from '@hooks/useDisclosure';
import { Rating } from '@mantine/core';
import { Textarea, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { reviewKind } from '@constants';
import useAuth from '@hooks/useAuth';
import { AppConstants } from '@constants';
import { Avatar } from '@mantine/core';
import { showSucsessMessage } from '@services/notifyService';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
// import TextField from '@components/common/form/TextField';
import ToolTips from '@components/common/elements/ToolTips';
import { ReactComponent as Star } from '@assets/icons/starIconMobi.svg';
import { Form, Formik } from 'formik';
const DetailComponent = ({ style, reviewData, executeReviewData }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const [checkModal, setCheckModal] = useState(1);
    const [openedReview, { open: openReview, close: closeReview }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            star: 0,
        },
    });
    const params = useParams();
    const { execute: createReview, loading: loadingexpert } = useFetch(apiConfig.review.create);
    const handleCreateReview = (values) => {
        createReview({
            data: {
                ...values,
                kind: checkModal,
                courseId: params?.id,
                // ...(refcode && { referralCode: refcode }),
            },
            onCompleted: (res) => {
                showSucsessMessage('Đánh giá thành công');
                closeReview();
            },
            onError: (error) => {
                // error?.response?.data?.code == EXPERT_REGISTRATION_ERROR_PHONE_OR_EMAIL_ALREADY_USED
                //     ? showErrorMessage(
                //         translate.formatMessage(errorMessage.EXPERT_REGISTRATION_ERROR_PHONE_OR_EMAIL_ALREADY_USED),
                //     )
                //     : '';
            },
        });
    };
    const { profile } = useAuth();
    const { data: courseDetailData, execute: courseDetailExecute } = useFetch(apiConfig.course.getDetail);

    useEffect(() => {
        executeReviewData({
            params: {
                courseId: params?.id,
            },
        });
        if (params?.id)
            courseDetailExecute({
                pathParams: {
                    id: params?.id,
                },
            });
    }, [params?.id]);

    return (
        <Container className={styles.headerContainer} styles={style}>
            <Flex gap={30}>
                <img style={{ cursor: 'pointer' }} onClick={() => navigate('/')} src={back} alt="" />
                <Title style={{ cursor: 'pointer' }} onClick={() => navigate('/')} order={3}>
                    <FormattedMessage defaultMessage="Trang chủ" />
                </Title>
                <Divider orientation="vertical" />
                <Title order={3}>
                    {courseDetailData?.data?.name}
                    {courseDetailData?.data?.expert?.account?.fullName
                        ? ` - ${courseDetailData?.data?.expert?.account?.fullName}`
                        : null}
                </Title>
            </Flex>
            <Flex align="center" gap={50}>
                {reviewData?.totalElements === 0 && (
                    <ToolTips content="Đánh giá khóa học" place="bottom">
                        <Flex
                            align="center"
                            gap={10}
                            onClick={() => {
                                setCheckModal(reviewKind.REVIEW_KIND_COURSE);
                                openReview();
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Star width={'30px'} />

                            <Title order={3}>
                                <FormattedMessage defaultMessage="Đánh giá" />
                            </Title>
                        </Flex>
                    </ToolTips>
                )}
                {/* <ToolTips content="Đánh giá hệ thống" place="bottom">
                    <Flex
                        align="center"
                        gap={10}
                        onClick={() => {
                            setCheckModal(reviewKind.REVIEW_KIND_SYSTEM);
                            openReview();
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Title order={3}>
                            <FormattedMessage defaultMessage="Hệ thống" />
                        </Title>
                    </Flex>
                </ToolTips> */}
                <Flex align="center" gap={10}>
                    <div className={styles.buttonShare} style={{ cursor: 'pointer' }}>
                        <FormattedMessage defaultMessage="Chia sẻ" />
                    </div>
                    <div className={styles.buttonShare} style={{ padding: '8px 7px', cursor: 'pointer' }}>
                        <img src={dots} alt="" style={{ width: '30px', height: '10px' }} />
                    </div>
                </Flex>
            </Flex>
            <BasicModal
                isOpen={openedReview}
                size="calc(27vw)"
                onCloseModal={closeReview}
                footer={false}
                style={{ position: 'relative', width: '50vw', height: '50vh' }}
                classNames={{
                    root: styles.modalLoginRoot,
                    inner: styles.inner,
                    header: styles.header,
                    title: styles.title,
                    content: styles.content,
                    body: styles.body,
                }}
                title={translate.formatMessage(commonMessage.reivewWrite)}
            >
                <Stack justify="center">
                    <form onSubmit={form.onSubmit((values) => handleCreateReview(values))}>
                        <Stack align="center" mt={20}>
                            <Avatar
                                radius="50%"
                                src={
                                    profile?.account?.avatar?.includes('https') || profile?.account?.avatar == undefined
                                        ? avatar
                                        : AppConstants.contentRootUrl + profile?.account?.avatar
                                }
                                size="8rem"
                            />
                            <Text fw={600} fz={18}>
                                {profile?.account?.fullName ?? profile?.account?.fullName}
                            </Text>
                            {<Rating size="xl" {...form.getInputProps('star')} />}
                        </Stack>

                        <Textarea
                            mt={24}
                            // label={translate.formatMessage(message.desc)}
                            placeholder={translate.formatMessage(commonMessage.reivewWrite)}
                            size="md"
                            classNames={{
                                root: styles.textAreaRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            minRows={4}
                            {...form.getInputProps('message')}
                        />

                        <Button fullWidth mt={10} type="submit" size="lg">
                            Viết đánh giá
                        </Button>
                    </form>
                </Stack>
            </BasicModal>
        </Container>
    );
};

export default DetailComponent;
