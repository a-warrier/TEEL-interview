package org.sailplatform.fsbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.sailplatform.fsbackend.service.PersonService;

@SpringBootTest
@AutoConfigureMockMvc
class FsbackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PersonService personService;

    @Test
    public void testAddPerson() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/add")
                .param("firstName", "John")
                .param("lastName", "Doe"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testUpdatePerson() throws Exception {
        Long personId = 1L;
        mockMvc.perform(MockMvcRequestBuilders.put("/update/" + personId)
                .contentType("application/json")
                .content("{\"firstName\":\"UpdatedFirstName\",\"lastName\":\"UpdatedLastName\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testDeletePerson() throws Exception {
        Long personId = 1L;
        mockMvc.perform(MockMvcRequestBuilders.delete("/delete")
                .param("id", personId.toString()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testSearchPerson() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/search")
                .param("firstName", "John"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}