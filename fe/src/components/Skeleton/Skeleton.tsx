import { Card, Skeleton } from "antd"

const Skeleton_item = () => {
    return (
        <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} hoverable>
                    <Skeleton
                        active
                        paragraph={{ rows: 2 }}
                        title={{ width: '0%' }}
                        style={{ height: '200px' }}
                    />
                </Card>
            ))}
        </div>
    )
}

export default Skeleton_item