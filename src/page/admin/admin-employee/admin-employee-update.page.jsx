// import React, { useState } from 'react'
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
// } from '@chakra-ui/react'


// const AdminEmployeeUpdatePage = (props) => {


//   return (
//     <Modal
//       initialFocusRef={initialRef}
//       finalFocusRef={finalRef}
//       isOpen={isOpen}
//       onClose={onClose}
//       onCloseComplete={onCloseComplete}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>직원정보수정</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody pb={6}>
//           <FormControl>
//             <FormLabel>직원이름</FormLabel>
//             <Input ref={initialRef} defaultValue={props.updateDep.department} placeholder='직원이름을 수정해주세요' onChange={e => { setInputData({ ...inputData, department: e.target.value }) }} />
//           </FormControl>

//         </ModalBody>

//         <ModalFooter>
//           <Button colorScheme='teal' mr={3} onClick={depUpdate}>
//             수정
//           </Button>
//           <Button onClick={onClose}>닫기</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   )
// }

// export default AdminEmployeeUpdatePage