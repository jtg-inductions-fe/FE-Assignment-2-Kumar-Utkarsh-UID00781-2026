import { LinearProgress, Stack, Typography } from '@mui/material';

import { orderStatusArray, OrderStatusType } from '@schemas/orders.schema';

type OrderProgressProps = {
    orderStatus: OrderStatusType;
};

const formatStatus = (status: OrderStatusType) => {
    const titledStatus = status[0].toUpperCase() + status.slice(1);
    const statusWithSpaces = titledStatus.split('_').join(' ');
    return statusWithSpaces;
};

const OrderProgress = ({ orderStatus }: OrderProgressProps) => {
    const currentIndex = orderStatusArray.indexOf(orderStatus);
    const statusCount = orderStatusArray.length;
    return (
        <Stack spacing={4}>
            <LinearProgress
                color={orderStatus === 'rejected' ? 'error' : 'success'}
                variant="determinate"
                value={(currentIndex / (statusCount - 1)) * 100}
            />
            <Typography
                textAlign="center"
                fontWeight={500}
                color={orderStatus === 'rejected' ? 'error' : 'success'}
            >
                {formatStatus(orderStatus)}
            </Typography>
        </Stack>
    );
};

export default OrderProgress;
