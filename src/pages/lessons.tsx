import Heading from '@/components/Heading'
import Margin from '@/components/Margin'
import usePageLabel from '@/hooks/usePageLabel'
import Template from '@/layouts/template'
import { Select } from '@nextui-org/select'

export default function LessonsPage() {
  const pageLabel = usePageLabel()  

  return (
    <Template>
      <div>
        <Heading>{pageLabel}</Heading>

        <Margin direction="b" value={30}/>

        {/*  */}

        <Margin direction="b" value={30}/>

        <div className="w-full flex flex-col">
          <p className="text-lg">Сначала выберите группу</p>

          
        </div>
      </div>
    </Template>
  )
}
