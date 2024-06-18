'use client'
import Title from '@/UI/Title'
import Grid from '@/UI/Grid'
import Cards from '@/components/Cards'
import {useAccount} from '@/providers/AccountProvider'

export default function Page() {
    const {accountType} = useAccount()

    return (
        <>
            <Title type={'h2'} content={'Аккаунт'}/>
            {accountType === 'employee' ?
                <>
                    <Title type={'h3'} content={'Ваши резюме'} addClassName={'mb-4'}/>
                    <Grid>
                        <Cards isDraft={true}/>
                    </Grid>
                </>
                :
                <div className={'space-y-4'}>
                    <Title type={'h3'} content={'Ваша компания'} addClassName={'mb-4'}/>
                    <Grid>
                        <Cards type={'company'} isDraft={true}/>
                    </Grid>
                    <Title type={'h3'} content={'Ваши вакансии'} addClassName={'mb-4'}/>
                    <Grid>
                        <Cards isDraft={true}/>
                    </Grid>
                </div>
            }
        </>
    )
}