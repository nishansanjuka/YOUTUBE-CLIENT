import LoadingPreset from "@/components/LoadingPreset";


export default function laoding() {
  return (
    <div className='flex justify-center items-center space-y-8 h-screen flex-col w-full text-white'>
      <LoadingPreset/>
      <h1 className=" text-neutral-100 text-md font-semibold underline underline-offset-4 tracking-[10px] uppercase">Loading</h1>
    </div>
  )
}
