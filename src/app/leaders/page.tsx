import Leaders from "@/components/Leaders"
import PageHeading from "@/components/PageHeading"
import TextBlock from "@/components/TextBlock"

export default function LeadersPage() {


    return (
        <>
            <PageHeading>Hike Leaders</PageHeading>
            <TextBlock>
                <p>Etiam id viverra metus, sed euismod justo. Mauris eu blandit elit. Nullam vel elit nulla. Ut dapibus elit vitae congue efficitur. Integer dictum nisl et libero suscipit vestibulum. Curabitur lobortis, mi ut finibus cursus, augue sapien vulputate velit, non lacinia orci neque at nisi. Suspendisse tincidunt feugiat velit, vel eleifend eros cursus ac.</p>
                <p>Etiam in tincidunt enim, tempus ornare libero. Integer sagittis in dui eu tincidunt. Curabitur pellentesque tempus nisl. Fusce vitae odio vitae nunc vestibulum euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum cursus pretium felis non luctus.</p>
            </TextBlock>
            <Leaders />
        </>
    )
}